SELECT *
    FROM Users as U
    JOIN Products as P
        ON P.user_id = U.id
        Where P.id = $1;
