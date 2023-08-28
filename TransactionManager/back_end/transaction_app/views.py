from django.shortcuts import render, get_object_or_404
from user_app.views import User_permissions
from rest_framework.response import Response
from rest_framework.status import (
  HTTP_200_OK,
  HTTP_201_CREATED,
  HTTP_204_NO_CONTENT,
  HTTP_400_BAD_REQUEST,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

from .models import Transaction
from .serializers import ATransactionSerializer, AbbrvTransactionSerializer

class All_transactions(User_permissions):
  # Get a list of all Transactions for the user
  def get(self, request):
    transactions_ordered = request.user.transactions.order_by('closing_date')
    transactions = AbbrvTransactionSerializer(transactions_ordered, many=True)
    return Response(transactions.data)

  # Creates a Transaction instance for the logged-in user 
  def post(self, request):
    request.data["user_id"] = request.user
    new_transaction = Transaction(**request.data)
    new_transaction.save()
    return Response(ATransactionSerializer(new_transaction).data, status=HTTP_201_CREATED)

class A_transaction(User_permissions):
    # Gets a transaction by-id
    def get(self, request, id):
        a_transaction = get_object_or_404(request.user.transactions, id=id)
        return Response(ATransactionSerializer(a_transaction).data)
    
    # Update a transaction by-id
    def put(self, request, id):
      # print("Found Transaction:", id)
      print("Request:", request.data)
      existing_transaction = get_object_or_404(request.user.transactions, id=id)
      serializer = ATransactionSerializer(existing_transaction, data=request.data)    
      if serializer.is_valid():
        serializer.save()
        print("Serializer valid")
        print("Serializer:", serializer.data)
        return Response(serializer.data, status=HTTP_200_OK)
      return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
    
    # Delete a property by-id
    def delete(self, request, id):
        a_transaction = get_object_or_404(request.user.transactions, id=id)
        a_transaction.delete()
        return Response(status=HTTP_204_NO_CONTENT)