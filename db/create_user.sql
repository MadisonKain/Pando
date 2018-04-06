INSERT INTO Users
    ( name, profile_pic )
    VALUES ( $1, $2 )
    RETURNING *;