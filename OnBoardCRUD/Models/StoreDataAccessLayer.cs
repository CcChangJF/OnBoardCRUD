using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnBoardCRUD.Models
{
    public class StoreDataAccessLayer
    {
        private CRUDEntities db;
        public StoreDataAccessLayer()
        {
            db = new CRUDEntities();
        }

        public IEnumerable<Store> GetList()
        {
            return db.Store.Select(x => x).OrderBy(x => x.Id).ToList();
        }

        public Store GetStoreById(int id)
        {
            return db.Store.First(x => x.Id == id);
        }

        public bool AddStore(Store newStore)
        {
            try
            {
                db.Store.Add(newStore);
                db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool UpdateStore(Store updStore)
        {
            try
            {
                db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool DeleteStore(Store delStore)
        {
            try
            {
                db.Store.Remove(delStore);
                db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}