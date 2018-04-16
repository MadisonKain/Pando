INSERT INTO Users
    ( username, profile_pic, auth_id )
    VALUES ( $1, $2, $3 )
    RETURNING *;