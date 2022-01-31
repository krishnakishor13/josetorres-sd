from django.db.models.expressions import Value
from django.db.models.fields import CharField
from rest_framework.response import Response
from apps.users.mixins import CustomLoginRequiredMixin
from apps.transactions.serializers import ListTransactionSerializer, TransactionSerializer
from apps.transactions.models import Transaction
from apps.transactions.models import Category
from rest_framework import generics, status
from datetime import datetime
from calendar import monthrange
from django.db.models import Sum
from collections import defaultdict
import operator
from django.db.models.functions import Concat
from config.helpers.error_response import error_response
from datetime import timedelta
from dateutil.relativedelta import relativedelta

class TransactionAdd(CustomLoginRequiredMixin, generics.CreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

    def post(self, request, *args, **kwargs):
        serializer = TransactionSerializer()
        serializer.validate(request.data)
        category_id = int(request.data['category'])

        category = Category.objects.get(id=category_id)
        if (category is None):
            return error_response('Category not found.', status.HTTP_400_BAD_REQUEST)

        request.data._mutable = True
        request.data['user'] = request.login_user.id
        request.data['category'] = category.id

        return self.create(request, *args, **kwargs)

class TransactionUpdate(CustomLoginRequiredMixin, generics.UpdateAPIView):
    serializer_class = TransactionSerializer
    queryset = Transaction.objects.all()
    lookup_field = 'id'

    def put(self, request, *args, **kwargs):

        serializer = TransactionSerializer()
        serializer.validate(request.data)

        # Get URL Param
        id = self.kwargs['id']

        transaction = Transaction.objects.filter(user_id=request.login_user.id, id=id).first()
        print("transaction",transaction)
        if transaction is None:
            return error_response('Transaction not found.', status.HTTP_400_BAD_REQUEST)
        
        category_id = int(request.data['category'])

        category = Category.objects.get(id=category_id)
        if (category is None):
            return error_response('Category not found.', status.HTTP_400_BAD_REQUEST)

        request.data._mutable = True
        request.data['user'] = request.login_user.id
        request.data['category'] = category.id

        return self.update(request, *args, **kwargs)

class TransactionDelete(CustomLoginRequiredMixin, generics.DestroyAPIView):
    serializer_class = TransactionSerializer
    queryset = Transaction.objects.all()
    lookup_field = 'id'

    def delete(self, request, *args, **kwargs):
        # Get URL Param
        id = self.kwargs['id']

        transaction = Transaction.objects.filter(user_id=request.login_user.id, id=id).first()

        if transaction is None:
            return error_response('Transaction not found.', status.HTTP_400_BAD_REQUEST)

        self.destroy(request, *args, **kwargs)
        
        return Response({'message': "Success."})
                
class TransactionList(CustomLoginRequiredMixin, generics.ListAPIView):
    serializer_class = ListTransactionSerializer

    def get(self, request, *args, **kwargs):
        self.queryset = Transaction.objects.order_by('-date').filter(user_id = request.login_user.id)
        return self.list(request, *args, **kwargs)

class TransactionReport(CustomLoginRequiredMixin, generics.ListAPIView):
    serializer_class = ListTransactionSerializer

    def get(self, request, *args, **kwargs):
        current_date = datetime.today()
        current_year = current_date.year

        past_date = (current_date - relativedelta(months=3)).date()

        start_date = datetime(past_date.year, past_date.month, 1).date()
        end_date = datetime(current_year, current_date.month, monthrange(current_year, current_date.month)[-1]).date()

        transactions = Transaction.objects.filter(
            user_id = request.login_user.id, 
            date__gte=start_date,
            date__lte=end_date
        ).values("date__month", "date__year", 'type').annotate(
            total_amount=Sum('amount'), 
            date=Concat('date__month', Value('/'), 'date__year', 
            output_field=CharField())).order_by('date')

        # Groupby date transaction within expense and income
        list_result = [entry for entry in transactions] 
        groups = defaultdict(list)
        for obj in list_result:
            groups[obj['date']].append(obj)
        
        # Make sure that list result is consistently 4 arrays
        new_list = list(groups.values())
        result = [] 
        for i in range(4):
            if(i < len(new_list)):
                result.append(new_list[i])
            else:
                result.insert(0, [
                    { "date": "N/A", "type": "expense", "total_amount": 0 },
                    { "date": "N/A", "type": "income", "total_amount": 0 }
                ])

        return Response(result)

class ExpenseReport(CustomLoginRequiredMixin, generics.ListAPIView):
    serializer_class = ListTransactionSerializer

    def get(self, request, *args, **kwargs):
        current_date = datetime.today()
        current_year = current_date.year

        past_date = (current_date - relativedelta(months=3)).date()
        
        start_date = datetime(past_date.year, past_date.month, 1).date()
        end_date = datetime(current_year, current_date.month, monthrange(current_year, current_date.month)[-1]).date()

        transactions = Transaction.objects.filter(
            user_id=request.login_user.id, 
            type='expense', 
            date__gte=start_date,
            date__lte=end_date
        ).values('category_id').annotate(total_amount=Sum('amount'))
        
        total_expense = sum(map(operator.itemgetter('total_amount'),transactions))

        for transaction in transactions:
            category = Category.objects.filter(id=transaction['category_id']).get()
            transaction['category_name'] = category.name
            transaction['category_color'] = category.color_code
            transaction['total_amount_percent'] = transaction['total_amount'] * 100 / total_expense
            
        return Response({
            'data': transactions, 
            'total_expense': total_expense, 
            'budget': request.login_user.budget,
            'reminder': request.login_user.budget - total_expense,
            })
