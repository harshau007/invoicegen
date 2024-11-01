package com.harsh.InvoiceGen.services;

import com.harsh.InvoiceGen.dto.InvoiceData;
import gg.jte.ContentType;
import gg.jte.TemplateEngine;
import gg.jte.output.StringOutput;
import gg.jte.resolve.DirectoryCodeResolver;
import org.springframework.stereotype.Service;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

@Service
public class InvoiceService {
    private final TemplateEngine templateEngine;

    public InvoiceService() {
        this.templateEngine = TemplateEngine.create(new DirectoryCodeResolver(Paths.get("src/main/jte")), ContentType.Html);
    }

    public String renderTemplate(InvoiceData invoiceData) {
        StringOutput output = new StringOutput();
        Map<String, Object> param = new HashMap<>();
        for(InvoiceData.Item item : invoiceData.Items) {
            item.totalAmount = item.quantity * item.unitPrice;
            invoiceData.TotalAmount += item.totalAmount;
        }

        param.put("invoiceData", invoiceData);
        templateEngine.render("invoice.jte", param, output);
        return output.toString();
    }
}
