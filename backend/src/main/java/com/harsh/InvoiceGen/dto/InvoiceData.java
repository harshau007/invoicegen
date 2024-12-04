package com.harsh.InvoiceGen.dto;

import lombok.Data;
import lombok.Getter;

import java.util.List;

public class InvoiceData {
    public String InvoiceNumber;
    public String InvoiceDate;
    public String CustomerName;
    public String CustomerAddress;
    public List<Item> Items;
    public double TotalAmount;

    @Getter
    public static class Item {
        public String itemName;
        public int quantity;
        public double unitPrice;
        public double totalAmount;

        public Item() {}

        public Item(String itemName, int quantity, double unitPrice) {
            this.itemName = itemName;
            this.quantity = quantity;
            this.unitPrice = unitPrice;
            this.totalAmount = this.quantity * this.unitPrice;
        }

    }
}
