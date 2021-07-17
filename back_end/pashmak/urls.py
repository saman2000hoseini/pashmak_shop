from django.conf.urls import url
from django.urls import path
from . import views

urlpatterns = [
    url(r'^$', views.index),
    url(r'^admin$',views.admin, name="admin"),
    url(r'^delete_category$',views.delete_category, name="delete_category"),
    url(r'^edited_category$',views.edited_category, name="edited_category"),
    url(r'^product_sort$',views.product_sort, name="product_sort"),
    url(r'^product_search$',views.product_search, name="product_search"),
]
