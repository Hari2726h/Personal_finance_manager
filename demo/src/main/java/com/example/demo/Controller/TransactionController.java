package com.example.demo.Controller;

import java.util.List;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Entity.*;
import com.example.demo.Repository.*;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "*")
public class TransactionController {

    @Autowired
    private TransactionRepository transactionRepo;

    @Autowired
    private UserRepository userRepo;

    @PostMapping
    public ResponseEntity<?> addTransaction(@RequestBody Transaction transaction) {
        if (transaction.getDate() == null) transaction.setDate(LocalDate.now());
        return ResponseEntity.ok(transactionRepo.save(transaction));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getTransactionsByUser(@PathVariable Long userId) {
        User user = userRepo.findById(userId).orElse(null);
        if (user == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        return ResponseEntity.ok(transactionRepo.findByUser(user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTransaction(@PathVariable Long id) {
        transactionRepo.deleteById(id);
        return ResponseEntity.ok("Deleted");
    }
    
}
