SELECT *
    FROM Products as P
    JOIN Users as U
        ON P.user_id = U.id
        Where P.id = $1;