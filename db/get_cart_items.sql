SELECT *
    FROM OrderTable as OT
    JOIN Cart as C
        ON OT.id = C.o_id
    JOIN Products as P
        ON P.id = C.p_id
    WHERE OT.status = true
    ORDER BY P.name ASC