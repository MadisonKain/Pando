UPDATE OrderTable
    SET total = $1
    WHERE id = $2
    RETURNING total;
