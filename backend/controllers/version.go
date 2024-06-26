package controllers

import (
	"crawlab-lite/services"
	"github.com/apex/log"
	"github.com/gin-gonic/gin"
	"github.com/spf13/viper"
)

func GetVersion(c *gin.Context) {
	version := viper.GetString("version")

	HandleSuccess(c, version)
}

func GetLatestRelease(c *gin.Context) {
	latestRelease, err := services.GetLatestRelease()
	if err != nil {
		log.Errorf(err.Error())
	}
	HandleSuccess(c, latestRelease)
}
