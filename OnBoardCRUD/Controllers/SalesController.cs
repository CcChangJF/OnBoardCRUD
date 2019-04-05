using Newtonsoft.Json;
using OnBoardCRUD.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OnBoardCRUD.Controllers
{
    public class SalesController : Controller
    {
        private SalesDataAccessLayer salesDAL;

        public SalesController()
        {
            salesDAL = new SalesDataAccessLayer();
        }

        // GET: Sales
        public ActionResult Index()
        {
            return View();
        }

        public string GetList(int? pageLimit, int? pageNum)
        {
            int pageItemsCount = Convert.ToInt32(pageLimit);
            if (0 == pageItemsCount) { pageItemsCount = 20; }
            int pageNumber = Convert.ToInt32(pageNum);
            if (0 == pageNumber) { pageNumber = 1; }
            var allSaless = salesDAL.GetList();
            int count = allSaless.Count();
            var sales = allSaless.Skip((pageNumber - 1) *
                pageItemsCount).Take(pageItemsCount);
            var salesWithCount = new { Count = count, Sales = sales };

            var salesJsonData = JsonConvert.SerializeObject(salesWithCount,
                Formatting.Indented, new JsonSerializerSettings
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });
            return salesJsonData;
        }

        private bool checkKeyValue(Dictionary<string, string> dict, string key)
        {
            if (!dict.ContainsKey(key) || "" == dict[key]) { return false; }
            return true;
        }

        private int? getInteger(string str)
        {
            try
            {
                int res = Convert.ToInt32(str);
                return res;
            }
            catch (Exception)
            {
                return null;
            }
        }

        private bool checkCustomer(int? customerId)
        {
            if (null == customerId) { return false; }
            int id = Convert.ToInt32(customerId);
            CustomerDataAccessLayer customerDAL = new CustomerDataAccessLayer();
            if (null == customerDAL.GetCustomerById(id)) { return false; }
            return true;
        }

        private bool checkProduct(int? productId)
        {
            if (null == productId) { return false; }
            int id = Convert.ToInt32(productId);
            ProductDataAccessLayer productDAL = new ProductDataAccessLayer();
            if (null == productDAL.GetProductById(id)) { return false; }
            return true;
        }

        private bool checkStore(int? storeId)
        {
            if (null == storeId) { return false; }
            int id = Convert.ToInt32(storeId);
            StoreDataAccessLayer storeDAL = new StoreDataAccessLayer();
            if (null == storeDAL.GetStoreById(id)) { return false; }
            return true;
        }

        [HttpPost]
        public bool CreateSales()
        {
            Stream req = Request.InputStream;
            req.Seek(0, System.IO.SeekOrigin.Begin);
            string json = new StreamReader(req).ReadToEnd();
            var sales = JsonConvert.DeserializeObject<Dictionary<string, string>>(json);
            if (!checkKeyValue(sales, "CustomerId") ||
                !checkKeyValue(sales, "StoreId") ||
                !checkKeyValue(sales, "ProductId"))
            {
                return false;
            }

            if (!checkCustomer(getInteger(sales["CustomerId"])) ||
               !checkProduct(getInteger(sales["ProductId"])) ||
               !checkStore(getInteger(sales["StoreId"])))
            {
                return false;
            }

            Sales newSale = new Sales();
            newSale.CustomerId = Convert.ToInt32(sales["CustomerId"]);
            newSale.StoreId = Convert.ToInt32(sales["StoreId"]);
            newSale.ProductId = Convert.ToInt32(sales["ProductId"]);

            if (sales.ContainsKey("DateSold"))
            {
                DateTime date;
                try
                {
                    CultureInfo culture = new CultureInfo("en-US");
                    date = Convert.ToDateTime(sales["DateSold"], culture);
                }
                catch (Exception) { return false; }

                newSale.DateSold = date;
            }
            else
            {
                newSale.DateSold = DateTime.Now;
            }
            return salesDAL.AddSales(newSale);
        }

        public bool UpdateSales(int id)
        {
            Stream req = Request.InputStream;
            req.Seek(0, System.IO.SeekOrigin.Begin);
            string json = new StreamReader(req).ReadToEnd();
            var sales = JsonConvert.DeserializeObject<Dictionary<string, string>>(json);
            Sales updSales = salesDAL.GetSalesById(id);
            if (null == updSales) { return false; }
            if (checkKeyValue(sales, "CustomerId") &&
                updSales.CustomerId.ToString() != sales["CustomerId"].Trim())
            {
                if (checkCustomer(getInteger(sales["CustomerId"])))
                {
                    updSales.CustomerId = Convert.ToInt32(sales["CustomerId"]);
                }
                else { return false; }
            }

            if (checkKeyValue(sales, "ProductId") &&
               updSales.ProductId.ToString() != sales["ProductId"].Trim())
            {
                if (checkProduct(getInteger(sales["ProductId"])))
                {
                    updSales.ProductId = Convert.ToInt32(sales["ProductId"]);
                }
                else { return false; }
            }

            if (checkKeyValue(sales, "StoreId") &&
               updSales.CustomerId.ToString() != sales["StoreId"].Trim())
            {
                if (checkStore(getInteger(sales["StoreId"])))
                {
                    updSales.StoreId = Convert.ToInt32(sales["StoreId"]);
                }
                else { return false; }
            }

            return salesDAL.UpdateSales(updSales);
        }

        public bool DeleteSales(int id)
        {
            Sales delCus = salesDAL.GetSalesById(id);
            if (null == delCus) { return true; }
            return salesDAL.DeleteSales(delCus);
        }
    }
}