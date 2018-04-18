UPDATE Users
    SET username = $1, bio = $2
    WHERE id = $3
