package com.abm.pos.com.abm.pos.bl;

import com.abm.pos.com.abm.pos.dto.TransactionLineItemDto;
import com.abm.pos.com.abm.pos.dto.reports.CatogoryComparisonDto;
import com.abm.pos.com.abm.pos.dto.reports.Top50ItemsDto;
import com.abm.pos.com.abm.pos.util.SQLQueries;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by asp5045 on 7/4/16.
 */

@Component
public class ReportManager {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    SQLQueries sqlQueries;


    public List<Top50ItemsDto> getTop50Items(String startDate, String endDate) {

        List<Top50ItemsDto> top50Items = new ArrayList<>();

        try
        {
            top50Items = jdbcTemplate.query(sqlQueries.getTop50Items, new Top50Mapper(), startDate,endDate);

        }
        catch (Exception e)
        {
            System.out.println(e);
        }

        return top50Items;

    }

    private final class Top50Mapper implements RowMapper<Top50ItemsDto>
    {
        @Override
        public Top50ItemsDto mapRow(ResultSet rs, int rowNum) throws SQLException {

            Top50ItemsDto top50 = new Top50ItemsDto();

            top50.setProductNo(rs.getString("PRODUCT_NO"));
            top50.setProductName(rs.getString("DESCRIPTION"));
            top50.setQuantity(rs.getInt("QUANTITY"));
            top50.setProductSumRetailPrice(rs.getDouble("RETAIL"));
            top50.setProductSumCostPrice(rs.getDouble("COST"));

            double profitAmount = top50.getProductSumRetailPrice()-top50.getProductSumCostPrice();
            System.out.println("1----"+ profitAmount);
            profitAmount = profitAmount * top50.getQuantity();
            System.out.println("2----"+ profitAmount);
            top50.setProductProfitAmount(profitAmount);
            System.out.println("3----"+top50.getProductProfitAmount());

            int test =+ top50.getQuantity();

            if( rs.isLast())
            {
                top50.setRetailPrice(test);
                System.out.println(test);
                System.out.println(top50.getRetailPrice());
                System.out.println("test");
            }
            return top50;
        }
    }

    public List<CatogoryComparisonDto> getSalesByCategory(String startDate, String endDate) {

        List<CatogoryComparisonDto> catogoryComparisonDtos = new ArrayList<>();

        try
        {
            CatogoryComparisonDto catogoryComparisonDto = new CatogoryComparisonDto();
            catogoryComparisonDto.setCommanName("Phone");
            catogoryComparisonDto.setQuantity(12);
            catogoryComparisonDto.setCostPrice(12.88);
            catogoryComparisonDto.setRetailPrice(32.54);
            catogoryComparisonDto.setProfitAmount(2.0);

            catogoryComparisonDtos.add(catogoryComparisonDto);
                    //= jdbcTemplate.query(sqlQueries.getSalesCategoryDetails, new SalesCategoryManager(), startDate, endDate)
        }
        catch (Exception e)
        {
            System.out.println(e);
        }
        return catogoryComparisonDtos;

    }


    private final class SalesCategoryManager implements RowMapper<CatogoryComparisonDto>
    {
        @Override
        public CatogoryComparisonDto mapRow(ResultSet rs, int rowNum) throws SQLException {

            CatogoryComparisonDto catogoryComparisonDto = new CatogoryComparisonDto();

            catogoryComparisonDto.setCommanName("Phone");
            catogoryComparisonDto.setQuantity(12);
            catogoryComparisonDto.setCostPrice(12.88);
            catogoryComparisonDto.setRetailPrice(32.54);
            catogoryComparisonDto.setProfitAmount(2.0);


            return catogoryComparisonDto;
        }
    }

}
