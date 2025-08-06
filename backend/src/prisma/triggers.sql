-- Triggers para o banco de dados Convoo
-- Execute este arquivo manualmente no seu banco de dados MySQL

-- Trigger 1: Calcula automaticamente a duração das chamadas de vídeo
DELIMITER //
CREATE TRIGGER set_duration_before_insert
BEFORE INSERT ON video_calls
FOR EACH ROW
BEGIN
  IF NEW.ended_at IS NOT NULL THEN
    SET NEW.duration_seconds = TIMESTAMPDIFF(SECOND, NEW.started_at, NEW.ended_at);
  END IF;
END//
DELIMITER ;

-- Trigger 2: Atualiza as estatísticas de minutos falados quando o usuário sai da chamada
DELIMITER //
CREATE TRIGGER trg_add_minutes_to_user_stats
AFTER UPDATE ON video_call_participants
FOR EACH ROW
BEGIN
  -- Só atualiza se o usuário acabou de sair da call
  IF OLD.left_at IS NULL AND NEW.left_at IS NOT NULL THEN
    UPDATE user_stats
    SET min_talked = min_talked + TIMESTAMPDIFF(MINUTE, NEW.joined_at, NEW.left_at)
    WHERE user_id = NEW.user_id;
  END IF;
END//
DELIMITER ; 