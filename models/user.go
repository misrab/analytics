package models


import (
	"time"

	"github.com/coopernurse/gorp"
	"code.google.com/p/go.crypto/bcrypt"
)


type User struct {
	Id       	int64	`db:"user_id"`
    Created  	int64
    Updated  	int64

    Email  		string

    //Salt 		string
    Hash 		string
}


func (user *User) SetPassword(password string) {
	// use negative cost to prompt default
	hash, err := bcrypt.GenerateFromPassword([]byte(password) , -1)

	if err != nil { return }
	user.Hash = string(hash)
}

// Returns nil error on sucess
func (user *User) ComparePassword(password string) error {
    return bcrypt.CompareHashAndPassword([]byte(user.Hash), []byte(password))
}

/*
 *  SQL Hooks
 */

// implement the PreInsert and PreUpdate hooks
func (i *User) PreInsert(s gorp.SqlExecutor) error {
    i.Created = time.Now().UnixNano()
    i.Updated = i.Created
    return nil
}

func (i *User) PreUpdate(s gorp.SqlExecutor) error {
    i.Updated = time.Now().UnixNano()
    return nil
}