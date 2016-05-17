package com.abm.pos.com.abm.pos.controllers;

import com.abm.pos.com.abm.pos.bl.AddManager;
import com.abm.pos.com.abm.pos.dto.AddCategoryDto;
import com.abm.pos.com.abm.pos.dto.AddCustomerDto;
import com.abm.pos.com.abm.pos.dto.AddProductDto;
import com.abm.pos.com.abm.pos.dto.AddVendorDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Created by asp5045 on 5/9/16.
 */

@RestController
@RequestMapping(value = "")
public class AddController {

    @Autowired
    AddManager addManager;

    @RequestMapping(value = "/addProducts",method = RequestMethod.POST, consumes = "application/json")
    public void addProduct(@RequestBody AddProductDto productDto)
    {
        try
        {
            addManager.addProductToDB(productDto);
        }
        catch (Exception e)
        {
            System.out.println(e);
        }
    }

    @RequestMapping(value = "/addCustomers",method = RequestMethod.POST, consumes = "application/json")
    public void addCustomer(@RequestBody AddCustomerDto customerDto)
    {
        try
        {
            addManager.addCustomerToDB(customerDto);
        }
        catch (Exception e)
        {
            System.out.println(e);
        }
    }

    @RequestMapping(value = "/addVendor",method = RequestMethod.POST, consumes = "application/json")
    public void addCustomer(@RequestBody AddVendorDto vendorDto)
    {
        try
        {
            addManager.addVendorToDB(vendorDto);
        }
        catch (Exception e)
        {
            System.out.println(e);
        }
    }


    @RequestMapping(value = "/addCategory",method = RequestMethod.POST, consumes = "application/json")
    public void addCustomer(@RequestBody AddCategoryDto categoryDto)
    {
        try
        {
            addManager.addCategoryToDB(categoryDto);
        }
        catch (Exception e)
        {
            System.out.println(e);
        }
    }





}
