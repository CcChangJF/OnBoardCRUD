using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnBoardCRUD.Models
{
    public class SalesDataAccessLayer
    {
        private CRUDEntities db;
        public SalesDataAccessLayer()
        {
            db = new CRUDEntities();
        }

        public IEnumerable<Sales> GetList()
        {
            return db.Sales.Select(x => x).OrderBy(x => x.Id).ToList();
        }

        public Sales GetSalesById(int id)
        {
            return db.Sales.First(x => x.Id == id);
        }

        public bool AddSales(Sales newSales)
        {
            try
            {
                db.Sales.Add(newSales);
                db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool UpdateSales(Sales updSales)
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

        public bool DeleteSales(Sales delSales)
        {
            try
            {
                db.Sales.Remove(delSales);
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