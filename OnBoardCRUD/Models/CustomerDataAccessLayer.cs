using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OnBoardCRUD.Models
{
    public class CustomerDataAccessLayer
    {
        private CRUDEntities db;
        public CustomerDataAccessLayer()
        {
            db = new CRUDEntities();
        }

        public IEnumerable<Customer> GetList()
        {
            return db.Customer.Select(x => x).OrderBy(x => x.Id).ToList();
        }

        public Customer GetCustomerById(int id)
        {
            return db.Customer.First(x => x.Id == id);
        }

        public bool AddCustomer(Customer newCus)
        {
            try
            {
                db.Customer.Add(newCus);
                db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool UpdateCustomer(Customer updCus)
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

        public bool DeleteCustomer(Customer delCus)
        {
            try
            {
                db.Customer.Remove(delCus);
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