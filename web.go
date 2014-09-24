package main

import (
	"log"
	"fmt"
	"time"
	"strings"
	
	"net/http"
	"encoding/base64"
	"encoding/hex"
	"crypto/md5"

	"github.com/go-martini/martini"
	"github.com/codegangsta/martini-contrib/render"
	//"github.com/martini-contrib/binding"

	//"github.com/coopernurse/gorp"

	"github.com/Misrab/misrab/models"
)


// returns what the key should be today
func getKey(pass string) string {
	y, m, d := time.Now().UTC().Date()
	date := fmt.Sprintf("%d-%s-%d-%s", y,m,d, pass)

	hasher := md5.New()
    hasher.Write([]byte(date))
    return hex.EncodeToString(hasher.Sum(nil))
}

func authorize(r render.Render, req *http.Request) {
	auth := strings.Replace(req.Header.Get("Authorization"), "Basic ", "", -1)

	decoded, err := base64.StdEncoding.DecodeString(auth)
	if err != nil { 
		log.Println("Error decoding api key: ")
		log.Println(err.Error())
		r.JSON(400, err)
		return
	}

	if getKey("frewsdf") != string(decoded) {
		r.JSON(401, nil)
		return
	}
}


func main() {
	m := martini.Classic()
	m.Map(models.SetupDB())
	m.Use(render.Renderer())


	// default angular app
	m.Get(".*", func(r render.Render) {
		//return "hi"
		r.HTML(200, "index", nil)
	})

	// Not found
	m.NotFound(func() string {
		// handle 404
		return "Sorry, that route doenst exist"
	})

	m.Run()
}