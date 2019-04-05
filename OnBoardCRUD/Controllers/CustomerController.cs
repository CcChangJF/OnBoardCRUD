using Newtonsoft.Json;
using OnBoardCRUD.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace OnBoardCRUD.Controllers
{
    public class CustomerController : Controller
    {
        private CustomerDataAccessLayer customerDAL;
        public CustomerController()
        {
            customerDAL = new CustomerDataAccessLayer();
        }

        // GET: Customer
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
            var allCustomers = customerDAL.GetList();
            int count = allCustomers.Count();
            var customers = allCustomers.Skip((pageNumber - 1) *
                pageItemsCount).Take(pageItemsCount);
            var cusWithCount = new { Count = count, Customers = customers };

            var cusJsonData = JsonConvert.SerializeObject(cusWithCount,
                Formatting.Indented, new JsonSerializerSettings
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });
            return cusJsonData;
        }

        [HttpPost]
        public bool CreateCustomer()
        {
            Stream req = Request.InputStream;
            req.Seek(0, System.IO.SeekOrigin.Begin);
            string json = new StreamReader(req).ReadToEnd();
            var cus = JsonConvert.DeserializeObject<Dictionary<string, string>>(json);
            Customer newCus = new Customer();
            if (cus.ContainsKey("Name") && "" != cus["Name"])
            {
                newCus.Name = cus["Name"];
            }
            else
            {
                return false;
            }
            if (cus.ContainsKey("Address"))
            {
                newCus.Address = cus["Address"];
            }
            return customerDAL.AddCustomer(newCus);
        }

        public bool UpdateCustomer(int id)
        {
            Stream req = Request.InputStream;
            req.Seek(0, System.IO.SeekOrigin.Begin);
            string json = new StreamReader(req).ReadToEnd();
            var cus = JsonConvert.DeserializeObject<Dictionary<string, string>>(json);
            Customer updCus = customerDAL.GetCustomerById(id);
            if (null == updCus) { return false; }
            if (cus.ContainsKey("Name"))
            {
                if ("" == cus["Name"]) { return false; }
                else { updCus.Name = cus["Name"]; }
            }
            if (cus.ContainsKey("Address"))
            {
                updCus.Address = cus["Address"];
            }
            return customerDAL.UpdateCustomer(updCus);
        }

        public bool DeleteCustomer(int id)
        {
            Customer delCus = customerDAL.GetCustomerById(id);
            if (null == delCus) { return true; }
            return customerDAL.DeleteCustomer(delCus);
        }

        public JsonResult Detail()
        {
            using (var db = new CRUDEntities())
            {
                var data = db.Customer.Select(x => new
                {
                    id = x.Id,
                    name = x.Name,
                    addr = x.Address
                }).ToList();
                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }

    }
}