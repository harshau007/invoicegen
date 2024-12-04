package com.harsh.InvoiceGen.controllers;

import gg.jte.ContentType;
import gg.jte.TemplateEngine;
import gg.jte.output.StringOutput;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@Controller
@RequestMapping("/user")
public class UserController {
    private final TemplateEngine templateEngine;

    public UserController() {
        this.templateEngine = TemplateEngine.createPrecompiled(ContentType.Html);
    }
    @GetMapping()
    public String index() {
        StringOutput output = new StringOutput();
        log.info("Request Made on root user");
        templateEngine.render("home", null, output);
        return output.toString();
    }
}
