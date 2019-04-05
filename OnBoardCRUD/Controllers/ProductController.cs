using Newtonsoft.Json;
using OnBoardCRUD.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OnBoardCRUD.Controllers
{
    public class ProductController : Controller
    {
        private ProductDataAccessLayer productDAL;

        public ProductController()
        {
            productDAL = new ProductDataAccessLayer();
        }
        
        // GET: Product
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
            var allProducts = productDAL.GetList();
            int count = allProducts.Count();
            var products = allProducts.Skip((pageNumber - 1) *
                pageItemsCount).Take(pageItemsCount);
            var proWithCount = new { Count = count, Products = products };

            var proJsonData = JsonConvert.SerializeObject(proWithCount,
                Formatting.Indented, new JsonSerializerSettings
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });
            return proJsonData;
        }

        [HttpPost]
        public bool CreateProduct()
        {
            Stream req = Request.InputStream;
            req.Seek(0, System.IO.SeekOrigin.Begin);
            string json = new StreamReader(req).ReadToEnd();
            var product = JsonConvert.DeserializeObject<Dictionary<string, string>>(json);
            Product newProduct = new Product();
            if (product.ContainsKey("Name") && "" != product["Name"])
            {
                newProduct.Name = product["Name"];
            }
            else
            {
                return false;
            }
            if (product.ContainsKey("Price"))
            {
                decimal price = 0;
                try
                {
                    price = Convert.ToDecimal(product["Price"]);
                }
                catch (Exception)
                {
                    return false;
                }
                newProduct.Price = price;
            }
            return productDAL.AddProduct(newProduct);
        }

        public bool UpdateProduct(int id)
        {
            Stream req = Request.InputStream;
            req.Seek(0, System.IO.SeekOrigin.Begin);
            string json = new StreamReader(req).ReadToEnd();
            var pro = JsonConvert.DeserializeObject<Dictionary<string, string>>(json);
            Product updProduct = productDAL.GetProductById(id);
            if (null == updProduct) { return false; }
            if (pro.ContainsKey("Name"))
            {
                if ("" == pro["Name"]) { return false; }
                else { updProduct.Name = pro["Name"]; }
            }
            if (pro.ContainsKey("Price"))
            {
                Decimal price = 0;
                try
                {
                    price = Convert.ToDecimal(pro["Price"]);
                }
                catch(Exception)
                {
                    return false;
                }
                updProduct.Price = price;
            }
            return productDAL.UpdateProduct(updProduct);
        }

        public bool DeleteProduct(int id)
        {
            Product delCus = productDAL.GetProductById(id);
            if (null == delCus) { return true; }
            return productDAL.DeleteProduct(delCus);
        }
       
    }
}