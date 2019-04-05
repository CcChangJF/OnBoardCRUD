using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnBoardCRUD.Models
{
    public class ProductDataAccessLayer
    {
        private CRUDEntities db;

        public ProductDataAccessLayer()
        {
            db = new CRUDEntities();
        }

        public IEnumerable<Product> GetList()
        {
            return db.Product.Select(x => x).OrderBy(x => x.Id).ToList();
        }

        public Product GetProductById(int id)
        {
            return db.Product.First(x => x.Id == id);
        }

        public bool AddProduct(Product newPro)
        {
            try
            {
                db.Product.Add(newPro);
                db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool UpdateProduct(Product updPro)
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

        public bool DeleteProduct(Product delPro)
        {
            try
            {
                db.Product.Remove(delPro);
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