from django.contrib import admin
from .models import Category

# Register your models here.

@admin.register(Category)
class CategoryModel(admin.ModelAdmin):
    fields = ['name', 'color_code']
    list_filter = []
    list_display = fields
    search_fields = ['name', 'color_code']