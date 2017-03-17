SELECT * FROM message_room
WHERE user1_id = $1 OR user2_id = $1;
