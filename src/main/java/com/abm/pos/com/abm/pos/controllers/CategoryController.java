package com.abm.pos.com.abm.pos.controllers;

import com.abm.pos.com.abm.pos.bl.CategoryManager;
import com.abm.pos.com.abm.pos.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.List;

/**
 * Created by asp5045 on 5/17/16.
 */
@RestController
@RequestMapping(value = "")
@CrossOrigin(origins = {"*"})
public class CategoryController {

    @Autowired
    CategoryManager categoryManager;

    @RequestMapping(value = "/addCategory",method = RequestMethod.POST, consumes = "application/json")
    public void addCategory(@RequestBody CategoryDto categoryDto)
    {
            categoryManager.addCategoryToDB(categoryDto);
    }

    @RequestMapping(value = "/editCategory",method = RequestMethod.POST, consumes = "application/json")
    public void editCategory(@RequestBody CategoryDto categoryDto)
    {
        categoryManager.editCategoryToDB(categoryDto);
    }

    @RequestMapping(value = "/getCategory",method = RequestMethod.GET)
    public List<CategoryDto> getCategoryDetails()
    {
        return categoryManager.getCategoryDetails();
    }

    /*@RequestMapping(value = "/{categoryId}",method = RequestMethod.DELETE)
    public void deleteCategory(@PathVariable int categoryId)
    {
        categoryManager.deleteCategoryToDB(categoryId);
    }*/

}
