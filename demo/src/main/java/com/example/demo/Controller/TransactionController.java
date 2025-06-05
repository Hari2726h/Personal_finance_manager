package com.example.demo.Controller;

import java.util.Collections;
import java.util.List;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Entity.*;
import com.example.demo.Repository.*;
@RestController
@RequestMapping("/api/transactions")
// @CrossOrigin(origins = "*")
public class TransactionController {

    @Autowired
    private TransactionRepository transactionRepo;

    @Autowired
    private UserRepository userRepo;

   @PostMapping
public ResponseEntity<?> addTransaction(@RequestBody Transaction transaction) {
    try {
        if (transaction.getUser() == null || transaction.getUser().getId() == null) {
            return ResponseEntity.badRequest().body("User ID is missing");
        }

        User user = userRepo.findById(transaction.getUser().getId()).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body("Invalid User ID");
        }

        transaction.setUser(user);
        Transaction saved = transactionRepo.save(transaction);
        return ResponseEntity.ok(saved);

    } catch (Exception e) {
        e.printStackTrace(); // Logs to console
        return ResponseEntity.status(500).body("Internal server error: " + e.getMessage());
    }
}

@GetMapping("/user/{userId}")
public ResponseEntity<List<Transaction>> getTransactionsByUser(@PathVariable Long userId) {
    System.out.println("Fetching transactions for userId: " + userId);

    User user = userRepo.findById(userId).orElse(null);
    if (user == null) {
        System.out.println("User not found");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
    }

    List<Transaction> transactions = transactionRepo.findByUser(user);
    System.out.println("Found transactions: " + transactions.size());

    return ResponseEntity.ok(transactions);
}



    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTransaction(@PathVariable Long id) {
        transactionRepo.deleteById(id);
        return ResponseEntity.ok("Deleted");
    }
}
