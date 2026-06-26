package com.appbit.server.service;

import com.appbit.server.dto.AgendamentoRequestDTO;
import com.appbit.server.dto.AgendamentoResponseDTO;
import com.appbit.server.dto.MentoriaResponseDTO;
import com.appbit.server.entity.Agendamento;
import com.appbit.server.entity.Mentor;
import com.appbit.server.entity.enums.StatusAgendamento;
import com.appbit.server.repository.AgendamentoRepository;
import com.appbit.server.repository.MentorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MentoriaService {

    private final MentorRepository mentorRepository;
    private final AgendamentoRepository agendamentoRepository;

    public List<MentoriaResponseDTO> listarMentores() {

        return mentorRepository.findAll()
                .stream()
                .map(this::converterParaDTO)
                .toList();
    }

    public AgendamentoResponseDTO agendar(
            AgendamentoRequestDTO request) {

        Mentor mentor = mentorRepository
                .findById(request.mentorId())
                .orElseThrow(() ->
                        new RuntimeException("Mentor não encontrado"));

        Agendamento agendamento =
                Agendamento.builder()
                        .alunoId(request.alunoId())
                        .mentor(mentor)
                        .dataAgendada(request.dataAgendada())
                        .horarioAgendada(request.horarioAgendada())
                        .status(StatusAgendamento.PENDENTE)
                        .linkReuniao(null)
                        .build();

        Agendamento salvo =
                agendamentoRepository.save(agendamento);

        return new AgendamentoResponseDTO(
                salvo.getId(),
                salvo.getStatus(),
                "Mentoria agendada com sucesso"
        );
    }

    private MentoriaResponseDTO converterParaDTO(
            Mentor mentor) {

        return new MentoriaResponseDTO(
                mentor.getId(),
                mentor.getEspecialidades(),
                mentor.getBiografia()
        );
    }
}
