from django.db import models

class User(models.Model):
    email = models.CharField(max_length=255,editable=False,unique=True)
    password = models.CharField(max_length=255)
    f_name = models.CharField(max_length=255)
    s_name = models.CharField(max_length=255)
    address = models.TextField(max_length=1000)
    charge = models.IntegerField()
    admin = models.BooleanField()


class Category(models.Model):
    c_name = models.CharField(max_length=255,unique=True, primary_key=True)

class Product(models.Model):
    p_name = models.CharField(max_length=255,unique=True)
    category = models.ForeignKey(Category,on_delete=models.SET_DEFAULT, default="دسته بندی نشده")
    price = models.IntegerField()
    inventory = models.IntegerField()
    sold = models.IntegerField()
    added_date = models.DateField()
    img = models.ImageField(upload_to = 'pics')

class Order(models.Model):

    status_choices = (
        ('processing' , "در حال انجام"),
        ('done', "انجام شده"),
        ('cancelled',"لغو شده")
    )
    u_id = models.ForeignKey(User,on_delete=models.CASCADE)
    p_id = models.ForeignKey(Product,on_delete=models.CASCADE)
    p_name = models.CharField(max_length=255)
    count = models.IntegerField()
    price = models.IntegerField()
    status = models.CharField(max_length=225,choices=status_choices,default='processing')
    date = models.DateField()
    f_name = models.CharField(max_length=255)
    s_name = models.CharField(max_length=255)
    address = models.TextField(max_length=1000)

    





