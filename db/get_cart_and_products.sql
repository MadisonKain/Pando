SELECT *
    FROM Cart as C
    JOIN Products as P
        ON C.p_id = P.id
    WHERE C.o_id = $1;