package com.example.demo.Controller;
// package com.example.demo.Controller;

import java.util.List;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Entity.*;
import com.example.demo.Repository.*;

@RestController
@RequestMapping("/api/wallet")
@CrossOrigin(origins = "*")
public class WalletController {

    @Autowired
    private WalletRepository walletRepo;

    @Autowired
    private UserRepository userRepo;

    @PostMapping("/log")
    public ResponseEntity<?> logCash(@RequestBody WalletEntry entry) {
        if (entry.getDate() == null) entry.setDate(LocalDate.now());
        return ResponseEntity.ok(walletRepo.save(entry));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getWalletLogs(@PathVariable Long userId) {
        return ResponseEntity.ok(walletRepo.findByUserId(userId));
    }
}
