--set identity_insert customer on;
--insert into customer(id, name, Address) values(3, 'Alice', 'Alice''s A');
--insert into customer(id, name, Address) values(4, 'Cindy', 'Cindy''s A');
--insert into customer(id, name, Address) values(5, 'Dom', 'Dom''s A');
--set identity_insert customer off;
select * from customer;

--set identity_insert store on;
--insert into store(id, name, Address) values(2, 'Christchurch', 'Christchurch');
--insert into store(id, name, Address) values(3, 'Napier', 'Napier');
--insert into store(id, name, Address) values(4, 'Wellington', 'Wellington');
--set identity_insert store off;
select * from store;

--set identity_insert product on;
--insert into product(id, Name, price) values(4, 'Chips', 3.0);
--insert into product(id, Name, price) values(5, 'Eggs', 1.0);
--insert into product(id, Name, price) values(6, 'Pork', 5.0);
--set identity_insert product off;
--go

select * from product;

--set identity_insert sales on;
--insert into sales(id, ProductId, CustomerId, StoreId, DateSold) 
--values(1, 4, 2, 4, convert(datetime, '2019-03-31 08:12:13 am'));  
--insert into sales(id, ProductId, CustomerId, StoreId, DateSold) 
--values(2, 5, 4, 3, convert(datetime, '2019-03-31 11:12:13 am')); 
--insert into sales(id, ProductId, CustomerId, StoreId, DateSold) 
--values(3, 6, 3, 2, convert(datetime, '2019-03-31 03:12:10 pm')); 
--set identity_insert sales off;

select * from sales;