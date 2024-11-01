@import com.harsh.InvoiceGen.dto.InvoiceData

@param InvoiceData invoiceData

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <style>
        body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            color: #333;
            background-color: #f4f7fa;
            margin: 0;
            padding: 20px;
        }
        .invoice-container {
            background-color: #fff;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header-footer {
            background-color: #0073e6;
            color: #fff;
            text-align: center;
            padding: 15px;
            font-size: 1.2em;
            font-weight: bold;
            border-radius: 8px 8px 0 0;
        }
        .footer {
            background-color: #0073e6;
            color: #fff;
            text-align: center;
            padding: 10px;
            font-size: 0.9em;
            border-radius: 0 0 8px 8px;
        }
        .invoice-header {
            text-align: center;
            color: #333;
            margin: 30px 0;
        }
        .invoice-header h1 {
            color: #0073e6;
            margin-bottom: 5px;
        }
        .invoice-header p {
            margin: 0;
            font-size: 0.9em;
        }
        .section-title {
            color: #0073e6;
            font-size: 1.2em;
            margin-top: 30px;
            margin-bottom: 15px;
        }
        .invoice-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        .invoice-table th, .invoice-table td {
            border: 1px solid #e1e4e8;
            padding: 12px;
            font-size: 0.95em;
            text-align: center;
        }
        .invoice-table th {
            background-color: #0073e6;
            color: #fff;
            text-transform: uppercase;
        }
        .total-row {
            font-weight: bold;
            color: #333;
        }
        .text-right {
            text-align: right;
        }
    </style>
    <title>Invoice</title>
</head>
<body>
<div class="invoice-container">
    <div class="header-footer">Company Name</div>

    <div class="invoice-header">
        <h1>Invoice</h1>
        <p>Invoice Number: ${invoiceData.InvoiceNumber}</p>
        <p>Date: ${invoiceData.InvoiceDate}</p>
    </div>

    <div>
        <h3 class="section-title">Billing Information</h3>
        <p><strong>Customer Name:</strong> ${invoiceData.CustomerName}</p>
        <p><strong>Address:</strong> ${invoiceData.CustomerAddress}</p>
    </div>

    <table class="invoice-table">
        <thead>
        <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total Price</th>
        </tr>
        </thead>
        <tbody>
        @for(var item: invoiceData.Items)
            <tr>
                <td>${item.itemName}</td>
                <td>${item.quantity}</td>
                <td>${item.unitPrice}</td>
                <td>${item.totalAmount}</td>
            </tr>
        @else
            <tr>
                <td colspan="4" class="text-center">No items available</td>
            </tr>
        @endfor
        </tbody>
        <tfoot>
        <tr>
            <td colspan="3" class="text-right total-row">Total Amount:</td>
            <td class="total-row">${invoiceData.TotalAmount}</td>
        </tr>
        </tfoot>
    </table>

    <div class="footer">Thank you for your business!</div>
</div>
</body>
</html>
