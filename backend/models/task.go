package models

import (
	"crawlab-lite/constants"
	uuid "github.com/satori/go.uuid"
	"time"
)

type Task struct {
	Id              uuid.UUID            `json:"id"`
	SpiderId        uuid.UUID            `json:"spider_id"`
	SpiderVersionId uuid.UUID            `json:"spider_version_id"`
	ScheduleId      uuid.UUID            `json:"schedule_id"`
	Status          constants.TaskStatus `json:"status"`
	Cmd             string               `json:"cmd"`
	Error           string               `json:"error"`
	CreateTs        time.Time            `json:"create_ts"`
	UpdateTs        time.Time            `json:"update_ts"`
	StartTs         time.Time            `json:"start_ts"`
	FinishTs        time.Time            `json:"finish_ts"`
	ResultCount     int                  `json:"result_count"`
	ErrorLogCount   int                  `json:"error_log_count"`
	WaitDuration    float64              `json:"wait_duration"`
	RuntimeDuration float64              `json:"runtime_duration"`
	TotalDuration   float64              `json:"total_duration"`
}

type TaskLog struct {
	TaskId   uuid.UUID            `json:"task_id"`
	LineText string               `json:"line_text"`
	LogStd   constants.TaskLogStd `json:"log_std"`
	CreateTs time.Time            `json:"create_ts"`
}
