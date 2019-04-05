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
    public class StoreController : Controller
    {
        private StoreDataAccessLayer storeDAL;
        public StoreController()
        {
            storeDAL = new StoreDataAccessLayer();
        }

        // GET: Store
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
            var allStores = storeDAL.GetList();
            int count = allStores.Count();
            var stores = allStores.Skip((pageNumber - 1) *
                pageItemsCount).Take(pageItemsCount);
            var storeWithCount = new { Count = count, Stores = stores };

            var storeJsonData = JsonConvert.SerializeObject(storeWithCount,
                Formatting.Indented, new JsonSerializerSettings
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });
            return storeJsonData;
        }

        [HttpPost]
        public bool CreateStore()
        {
            Stream req = Request.InputStream;
            req.Seek(0, System.IO.SeekOrigin.Begin);
            string json = new StreamReader(req).ReadToEnd();
            var store = JsonConvert.DeserializeObject<Dictionary<string, string>>(json);
            Store newStore = new Store();
            if (store.ContainsKey("Name") && "" != store["Name"])
            {
                newStore.Name = store["Name"];
            }
            else
            {
                return false;
            }
            if (store.ContainsKey("Address"))
            {
                newStore.Address = store["Address"];
            }
            return storeDAL.AddStore(newStore);
        }

        public bool UpdateStore(int id)
        {
            Stream req = Request.InputStream;
            req.Seek(0, System.IO.SeekOrigin.Begin);
            string json = new StreamReader(req).ReadToEnd();
            var cus = JsonConvert.DeserializeObject<Dictionary<string, string>>(json);
            Store updStore = storeDAL.GetStoreById(id);
            if (null == updStore) { return false; }
            if (cus.ContainsKey("Name"))
            {
                if ("" == cus["Name"]) { return false; }
                else { updStore.Name = cus["Name"]; }
            }
            if (cus.ContainsKey("Address"))
            {
                updStore.Address = cus["Address"];
            }
            return storeDAL.UpdateStore(updStore);
        }

        public bool DeleteStore(int id)
        {
            Store delCus = storeDAL.GetStoreById(id);
            if (null == delCus) { return true; }
            return storeDAL.DeleteStore(delCus);
        }
    }
}