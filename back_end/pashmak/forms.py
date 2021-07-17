from django import forms
from .models import Product

class NewProduct(forms.ModelForm):
    # p_name = forms.CharField(label="نام محصول")
    # p_category = forms.CharField(label="دسته بندی",initial="بدون دسته بندی")
    # p_price = forms.CharField(label="قیمت محصول")
    # p_inventory = forms.CharField(label="موجودی")
    # p_img = forms.CharField("تصویر محصول")

    class Meta:
        model = Product
        fields = ('p_name','category','price','inventory','img')



