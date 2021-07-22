from django.conf.urls import url
from django.urls import path
from . import views

urlpatterns = [
    url(r'^$', views.index, name="index"),
    url(r'^admin$', views.admin, name="admin"),
    url(r'^delete_category$', views.delete_category, name="delete_category"),
    url(r'^edited_category$', views.edited_category, name="edited_category"),
    url(r'^create_category$', views.create_category, name="create_category"),
    url(r'^product_buy$', views.product_buy, name="product_buy"),
    url(r'^get_user$', views.get_user, name="get_user"),
    url(r'^edited_product$', views.edited_product, name="edited_product"),
    url(r'^search_receipts$', views.search_receipts, name="search_receipts"),
    url(r'^product_sort$', views.product_sort, name="product_sort"),
    url(r'^product_search$', views.product_search, name="product_search"),
    url(r'^login$', views.login, name="login"),
    url(r'^register$', views.register, name="register"),
    url(r'^profile', views.profile, name="profile"),
    url(r'^user_receipts', views.user_receipts, name="user_receipts"),
]
