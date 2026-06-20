package com.appbit.server.controller;
import com.appbit.server.dto.*;
import com.appbit.server.entity.LogSaude;
import com.appbit.server.services.VittaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/saude")
@RequiredArgsConstructor
public class VittaController {

    private final VittaService vittaService;

    @GetMapping
    public ResponseEntity<MoodAnalysisDTO> getSaude() {
        return ResponseEntity.ok(
                vittaService.analyzeMood()
        );
    }
}
