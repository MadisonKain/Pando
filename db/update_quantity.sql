UPDATE Cart
    SET quantity = $1
    WHERE p_id = $2 AND o_id = $3