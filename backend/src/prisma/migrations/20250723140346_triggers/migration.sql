-- Nao esquecer de dar permissao TRIGGER para o usuario do banco de dados
-- Exemplo: GRANT TRIGGER ON `nome_do_banco`.* TO 'usuario'@'localhost';
-- Nao esquecer de setar log_bin_trust_function_creators=1 no MySQL
-- Exemplo: SET GLOBAL log_bin_trust_function_creators = 1;

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

DELIMITER//
CREATE TRIGGER trg_add_minutes_to_user_stats
AFTER UPDATE ON video_call_participants
FOR EACH ROW
BEGIN
  IF OLD.left_at IS NULL AND NEW.left_at IS NOT NULL THEN
    UPDATE user_stats
    SET min_talked = min_talked + TIMESTAMPDIFF(MINUTE, NEW.joined_at, NEW.left_at)
    WHERE user_id = NEW.user_id;
  END IF;
END//
DELIMITER ;
