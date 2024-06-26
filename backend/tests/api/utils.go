package api

import (
	"bytes"
	"crawlab-lite/config"
	"crawlab-lite/constants"
	"crawlab-lite/dao"
	"crawlab-lite/lib/validate_bridge"
	"crawlab-lite/results"
	"crawlab-lite/routes"
	"encoding/json"
	"errors"
	"github.com/apex/log"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"net/http"
	"net/http/httptest"
)

func InitTestApp() *gin.Engine {
	binding.Validator = new(validate_bridge.DefaultValidator)
	app := gin.Default()
	if err := config.InitConfig("../../config.yml"); err != nil {
		log.Error("Init config error:" + err.Error())
		panic(err)
	}
	routes.InitRoutes(app)
	return app
}

func Login(app *gin.Engine) (string, error) {
	user := dao.GetUser()
	if user == nil {
		return "", errors.New("user does not exist")
	}
	w := httptest.NewRecorder()
	values := map[string]string{"username": user.Username, "password": user.Password}
	req, err := PostJson("/api/login", values)
	if err != nil {
		return "", err
	}
	app.ServeHTTP(w, req)
	resp := GetResponse(w.Body)
	data := resp.Data.(string)
	if data == "" || resp.Code != http.StatusOK {
		return "", errors.New("login failed")
	}
	return data, nil
}

func PostJson(url string, form interface{}) (*http.Request, error) {
	buf, err := json.Marshal(form)
	if err != nil {
		return nil, err
	}
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(buf))
	if err != nil {
		return nil, err
	}
	req.Header.Set("Content-Type", "application/json")
	return req, nil
}

func PostJsonWithToken(url string, form interface{}, token string) (*http.Request, error) {
	req, err := PostJson(url, form)
	if err != nil {
		return nil, err
	}
	req.Header.Set(constants.AuthHeader, token)
	return req, nil
}

func GetResponse(body *bytes.Buffer) *results.ResponseBody {
	var resp *results.ResponseBody
	_ = json.Unmarshal(body.Bytes(), &resp)
	return resp
}
