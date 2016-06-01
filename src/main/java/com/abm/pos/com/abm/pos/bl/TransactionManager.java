package com.abm.pos.com.abm.pos.bl;

import com.abm.pos.com.abm.pos.dto.TransactionDto;
import com.abm.pos.com.abm.pos.dto.TransactionLineItemDto;
import com.abm.pos.com.abm.pos.dto.TransactionPaymentDto;
import com.abm.pos.com.abm.pos.util.SQLQueries;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by asp5045 on 5/20/16.
 */
@Component
public class TransactionManager {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    SQLQueries sqlQuery;

    public void addTransactionToDB(TransactionDto transactionDto) {

        try
        {
            jdbcTemplate.update(sqlQuery.addTransaction,
                    transactionDto.getTransactionDate(),
                    transactionDto.getTotalAmount(),
                    transactionDto.getTax(),
                    transactionDto.getDiscount(),
                    transactionDto.getCustomerId(),
                    transactionDto.getUserId(),
                    transactionDto.getPaymentId(),
                    transactionDto.getStatus());
            System.out.println("Transaction Added Successfully");

        }
        catch (Exception e)
        {
            System.out.println(e);
        }
    }

    public void getTransactionDetails(int transactionId) {
        try
        {
            jdbcTemplate.query(sqlQuery.getTransactionDetails,new TransactionManager.TransactionMapper());
        }
        catch (Exception e)
        {
            System.out.println(e);
        }
    }




    private static final class TransactionMapper implements RowMapper<TransactionDto>
    {

        @Override
        public TransactionDto mapRow(ResultSet rs, int rowNum) throws SQLException {

            TransactionDto transaction = new TransactionDto();

            transaction.setTransactionId(rs.getInt("TRANSACTION_ID"));
            transaction.setTransactionDate(rs.getString("TRANSACTION_DATE"));
            transaction.setTotalAmount(rs.getString("TOTAL_AMOUNT"));
            transaction.setTax(rs.getString("TAX_AMOUNT"));
            transaction.setDiscount(rs.getString("DISCOUNT_AMOUNT"));
            transaction.setCustomerId(rs.getInt("CUSTOMER_ID"));
            transaction.setUserId(rs.getInt("USER_ID"));
            transaction.setPaymentId(rs.getInt("PAYMENT_ID"));
            transaction.setStatus(rs.getString("STATUS"));

            return transaction;
        }
    }

    public void addTransactionLineItemToDB(TransactionLineItemDto transactionLineItemDto) {
        try
        {

            jdbcTemplate.update(sqlQuery.addTransactionLineItem,
                    transactionLineItemDto.getTransactionId(),
                    transactionLineItemDto.getProductId(),
                    transactionLineItemDto.getQuantity(),
                    transactionLineItemDto.getRetail(),
                    transactionLineItemDto.getCost(),
                    transactionLineItemDto.getTax(),
                    transactionLineItemDto.getDiscount());
            System.out.println("Transaction Line Item Added Successfully");
        }
        catch (Exception e)
        {
            System.out.println(e);
        }
    }
    public void getTransactionLineItemDetails(TransactionLineItemDto transactionLineItemDto) {
        try
        {
            jdbcTemplate.query(sqlQuery.getTransactionLineItemDetails,new TransactionManager.TransactionLineItemMapper());
        }
        catch (Exception e)
        {
            System.out.println(e);
        }
    }



    private static final class TransactionLineItemMapper implements RowMapper<TransactionLineItemDto>
    {

        @Override
        public TransactionLineItemDto mapRow(ResultSet rs, int rowNum) throws SQLException {

            TransactionLineItemDto lineItem = new TransactionLineItemDto();

            lineItem.setTransactionLineItemId(rs.getInt("TRANSACTION_LINE_ITEM_ID"));
            lineItem.setTransactionId(rs.getInt("TRANSACTION_ID"));
            lineItem.setProductId(rs.getInt("PRODUCT_ID"));
            lineItem.setQuantity(rs.getInt("QUANTITY"));
            lineItem.setRetail(rs.getDouble("RETAIL"));
            lineItem.setCost(rs.getDouble("COST"));
            lineItem.setDiscount(rs.getDouble("DISCOUNT"));
            lineItem.setTax(rs.getDouble("TAX"));

            return lineItem;
        }
    }


    public void addTransactionPaymentToDB(TransactionPaymentDto transactionPaymentDto) {
        try
        {
            jdbcTemplate.update(sqlQuery.addTransactionPaymentDetail,

                    transactionPaymentDto.getTransactionId(),
                    transactionPaymentDto.getTransactionDate(),
                    transactionPaymentDto.getPaymentId(),
                    transactionPaymentDto.getPaymentAmount());
            System.out.println("Transaction Payment Details Added Successfully");

        }
        catch (Exception e)
        {
            System.out.println(e);
        }
    }

    public void getTransactionPaymentDetails(TransactionPaymentDto transactionPaymentDto) {

        try
        {
            jdbcTemplate.query(sqlQuery.getTransactionPaymentDetails,new TransactionManager.TransactionPaymentMapper());
        }
        catch (Exception e)
        {
            System.out.println(e);
        }
    }

    private static final class TransactionPaymentMapper implements RowMapper<TransactionPaymentDto>
    {

        @Override
        public TransactionPaymentDto mapRow(ResultSet rs, int rowNum) throws SQLException {

            TransactionPaymentDto transPayment = new TransactionPaymentDto();

            transPayment.setTransactionPaymentId(rs.getInt("TRANSACTION_PAYMENT_ID"));
            transPayment.setTransactionId(rs.getInt("TRANSACTION_ID"));
            transPayment.setTransactionDate(rs.getString("TRANSACTION_DATE"));
            transPayment.setPaymentId(rs.getInt("PAYMENT_ID"));
            transPayment.setPaymentAmount(rs.getString("PAYMENT_AMOUNT"));

            return transPayment;
        }
    }
    }


