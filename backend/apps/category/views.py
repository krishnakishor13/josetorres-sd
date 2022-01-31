from apps.users.mixins import CustomLoginRequiredMixin
from rest_framework import generics
import random

from apps.category.models import Category
from apps.category.serializers import CategorySerializer

class CategoryAdd(CustomLoginRequiredMixin, generics.CreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def post(self, request, *args, **kwargs):

        serializer = CategorySerializer()
        serializer.validate(request.data)

        color_code = "#{:06x}".format(random.randint(0, 0xFFFFFF))

        request.data._mutable = True
        request.data['color_code'] = request.data['color_code'] if 'color_code' in request.data else color_code

        return self.create(request, *args, **kwargs)

class CategoryUpdate(CustomLoginRequiredMixin, generics.UpdateAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    lookup_field = 'id'

class CategoryDelete(CustomLoginRequiredMixin, generics.DestroyAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    lookup_field = 'id'
                
class CategoryList(CustomLoginRequiredMixin, generics.ListAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    pagination_class = None