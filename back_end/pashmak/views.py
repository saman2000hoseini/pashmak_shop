from django.shortcuts import render
from .forms import NewProduct
from datetime import date
from .models import Product,Category,Order
import json
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.http import JsonResponse

def index(request):
    
    products = Product.objects.order_by('sold')[:15]

    obj_paginator = Paginator(products, 15)
    page_range = obj_paginator.page_range

    categories = Category.objects.all()
    
    return render (request,'index.html',{'products_list': products, 'categories_list':categories,'page_list':page_range})

def admin(request):

    form = NewProduct()
    if request.method == "POST":
    
        pr_name = request.POST['p_name']
        p_category = Category(request.POST['category'])
        p_price = request.POST['price']
        p_inventory = request.POST['inventory']
        p_sold = 0
        p_added_date = date.today()
        p_img = request.POST['img']

        new_product = Product(p_name=pr_name,category=p_category,price = p_price,inventory=p_inventory,sold=p_sold,added_date=p_added_date,img=p_img)
        new_product.save()

    products = Product.objects.all()
    categories = Category.objects.all()
    receipt = Order.objects.all()
       
    
    return render (request,'admin.html',{'form': form,'products_list': products,'categories_list':categories, 'receipts':receipt})

def search_receipts(request):
    data = json.loads(request.body)
    receipt = Order.objects.filter(id = data['code'])

    return render (request,'receipts.html',{'receipts':receipt})


def delete_category(request):

    print(request.body)
    data = json.loads(request.body)
    print(data['id'])
    instance = Category.objects.get(c_name = data['id'])
    instance.delete()
    categories = Category.objects.all()
    return render (request,'modify_category.html',{'categories_list':categories})

def edited_category(request):

    data = json.loads(request.body)
    instance = Category.objects.get(c_name = data['id'])
    instance.pk = data['new_c']
    instance.save()
    categories = Category.objects.all()
    return render (request,'modify_category.html',{'categories_list':categories})

def product_sort(request):

    data = json.loads(request.body)
    
    sorted_products = Product.objects.filter(price__gt=data['lower_price'],price__lt=data['higher_price']).order_by('sold')


    if(data['sort_item'] != "none" and data['sort_category'] == "none"):
        if (data['sort_item'] == 0):
            sorted_products = Product.objects.filter(price__gt=data['lower_price'],price__lt=data['higher_price']).order_by('sold')

        if (data['sort_item'] == 1):
           
            sorted_products = Product.objects.filter(price__gt=data['lower_price'],price__lt=data['higher_price']).order_by('-price')
        
        if (data['sort_item'] == 2):
            sorted_products = Product.objects.filter(price__gt=data['lower_price'],price__lt=data['higher_price']).order_by('price')
        

    if (data['sort_item'] != "none" and data['sort_category'] != "none"):
        if (data['sort_item'] == 0):
            sorted_products = Product.objects.filter(category = data['sort_category'],price__gt=data['lower_price'],price__lt=data['higher_price']).order_by('sold')

        if (data['sort_item'] == 1):
           
            sorted_products = Product.objects.filter(category = data['sort_category'],price__gt=data['lower_price'],price__lt=data['higher_price']).order_by('-price')
        
        if (data['sort_item'] == 2):
            sorted_products = Product.objects.filter(category = data['sort_category'],price__gt=data['lower_price'],price__lt=data['higher_price']).order_by('price')
    
    if (data['sort_item'] == "none" and data['sort_category'] != "none"):

            sorted_products = Product.objects.filter(category = data['sort_category'],price__gt=data['lower_price'],price__lt=data['higher_price'])
    

    obj_paginator = Paginator(sorted_products, 15)
    page_range = obj_paginator.page_range

    results = list(obj_paginator.page(data['page']).object_list)
    
    return render(request,'sorted_p.html',{'products_list':  results, 'page_list':  page_range})



def product_search(request):

    data = json.loads(request.body)
    products = Product.objects.filter(p_name = data['search'])

    return render(request,'sorted_p.html',{'products_list': products})

def edited_product(request):
    
    data = json.loads(request.body)
    instance = Product.objects.get(id = data['id'])
    instance.p_name = data['edited_name']
    instance.category = Category.objects.get(c_name = data['edited_category'])
    instance.price = data['edited_price']
    instance.inventory = data['edited_inventory']
    instance.save()

    products = Product.objects.all()

    return render(request,'new_p.html',{'products_list': products})


