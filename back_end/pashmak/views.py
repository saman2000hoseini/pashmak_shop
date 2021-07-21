from django.shortcuts import render
from .forms import NewProduct
from datetime import date
from .models import Product, Category, Order, User
import json
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.http import JsonResponse
from django.core import serializers
from django.contrib.auth.models import User as UserAuth
from django.contrib.auth import authenticate, login as login_auth
from django.contrib.auth.decorators import login_required


def index(request):
    products = Product.objects.all()

    obj_paginator = Paginator(products, 15)
    page = request.GET.get('page')
    paged_products = obj_paginator.get_page(page)

    categories = Category.objects.all()

    return render(request, 'index.html',
                  {'products_list': paged_products, 'categories_list': categories})


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

        new_product = Product(p_name=pr_name, category=p_category, price=p_price, inventory=p_inventory, sold=p_sold,
                              added_date=p_added_date, img=p_img)
        new_product.save()

    products = Product.objects.all()
    categories = Category.objects.all()
    receipt = Order.objects.all()

    return render(request, 'admin.html',
                  {'form': form, 'products_list': products, 'categories_list': categories, 'receipts': receipt})


def search_receipts(request):
    data = json.loads(request.body)
    receipt = Order.objects.filter(id=data['code'])

    return render(request, 'receipts.html', {'receipts': receipt})


def delete_category(request):
    print(request.body)
    data = json.loads(request.body)
    print(data['id'])
    instance = Category.objects.get(c_name=data['id'])
    instance.delete()
    categories = Category.objects.all()
    return render(request, 'modify_category.html', {'categories_list': categories})


def edited_category(request):
    data = json.loads(request.body)
    instance = Category.objects.get(c_name=data['id'])
    instance.pk = data['new_c']
    instance.save()
    categories = Category.objects.all()
    return render(request, 'modify_category.html', {'categories_list': categories})


def product_sort(request):
    data = json.loads(request.body)

    sorted_products = Product.objects.filter(price__gt=data['lower_price'], price__lt=data['higher_price']).order_by(
        'sold')

    if (data['sort_item'] != "none" and data['sort_category'] == "none"):
        if (data['sort_item'] == 0):
            sorted_products = Product.objects.filter(price__gt=data['lower_price'],
                                                     price__lt=data['higher_price']).order_by('sold')

        if (data['sort_item'] == 1):
            sorted_products = Product.objects.filter(price__gt=data['lower_price'],
                                                     price__lt=data['higher_price']).order_by('-price')

        if (data['sort_item'] == 2):
            sorted_products = Product.objects.filter(price__gt=data['lower_price'],
                                                     price__lt=data['higher_price']).order_by('price')

    if (data['sort_item'] != "none" and data['sort_category'] != "none"):
        if (data['sort_item'] == 0):
            sorted_products = Product.objects.filter(category=data['sort_category'], price__gt=data['lower_price'],
                                                     price__lt=data['higher_price']).order_by('sold')

        if (data['sort_item'] == 1):
            sorted_products = Product.objects.filter(category=data['sort_category'], price__gt=data['lower_price'],
                                                     price__lt=data['higher_price']).order_by('-price')

        if (data['sort_item'] == 2):
            sorted_products = Product.objects.filter(category=data['sort_category'], price__gt=data['lower_price'],
                                                     price__lt=data['higher_price']).order_by('price')

    if (data['sort_item'] == "none" and data['sort_category'] != "none"):
        sorted_products = Product.objects.filter(category=data['sort_category'], price__gt=data['lower_price'],
                                                 price__lt=data['higher_price'])

    obj_paginator = Paginator(sorted_products, 15)
    page = request.GET.get('page')
    paged_products = obj_paginator.get_page(page)

    return render(request, 'sorted_p.html', {'products_list': paged_products})


def product_search(request):
    data = json.loads(request.body)
    products = Product.objects.filter(p_name=data['search'])

    return render(request, 'sorted_p.html', {'products_list': products})


def edited_product(request):
    data = json.loads(request.body)
    instance = Product.objects.get(id=data['id'])
    instance.p_name = data['edited_name']
    instance.category = Category.objects.get(c_name=data['edited_category'])
    instance.price = data['edited_price']
    instance.inventory = data['edited_inventory']
    instance.save()

    products = Product.objects.all()

    return render(request, 'new_p.html', {'products_list': products})


def create_category(request):
    data = json.loads(request.body)

    instance = Category(c_name=data['new_c'])
    instance.save()
    categories = Category.objects.all()
    return render(request, 'modify_category.html', {'categories_list': categories})


def profile(request):
    receipt = Order.objects.filter(u_id=request.session['u_id'])
    return render(request, 'profile.html', {'receipts': receipt})


def login(request):
    if request.method == "POST":
        print("inja")
        user_email = request.POST.get('email')
        user_password = request.POST.get('password')
        user_auth = authenticate(request, username=user_email, password=user_password)
        if user_auth is not None:
            user = User.objects.get(email = user_email)
            request.session['u_id'] = user._get_pk_val
            request.session['email'] = user.email
            request.session['f_name'] = user.f_name
            request.session['s_name'] = user.s_name
            request.session['admin'] = user.admin

            login_auth(request, user_auth)
            return render (request, 'profile.html', {'user-f-name': user.f_name,'user-charge': user.charge})
        else:
            print("ih")
            return render(request, 'login.html')

    return render(request, 'login.html')


def register(request):
    if request.method == "POST":
        f_name = request.POST['f_name']
        s_name = request.POST['s_name']
        email = request.POST['email']
        password = request.POST['password']
        address = request.POST['address']

        duplicate_email = User.objects.filter(email=email).exists()
        if not duplicate_email:
            user = User(email=email, password=password, f_name=f_name, s_name=s_name, address=address, charge=0,
                        admin=False)
            user.save()
            user_auth = UserAuth.objects.create_user(username=email, password=password)
            user_auth.save()

    return render(request, 'register.html')


def get_user(request):
    if request.method == "POST":
        json_serializer = serializers.get_serializer("json")()
        users = json_serializer.serialize(User.objects.all(), ensure_ascii=False)
        print(users)
        return JsonResponse({'users': users})


@login_required(login_url='login')
def product_buy(request):
    pass

@login_required(login_url='login')
def profile(request):
    return render(request,'profile.html')