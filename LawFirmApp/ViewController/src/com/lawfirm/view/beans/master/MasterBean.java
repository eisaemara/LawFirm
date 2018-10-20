package com.lawfirm.view.beans.master;

import java.io.Serializable;

import oracle.adf.controller.TaskFlowId;

public class MasterBean implements Serializable {
    private String taskFlowId = "/WEB-INF/Lookup/LookupTF.xml#LookupTF";

    public MasterBean() {
    }

    public TaskFlowId getDynamicTaskFlowId() {
        return TaskFlowId.parse(taskFlowId);
    }

    public void setDynamicTaskFlowId(String taskFlowId) {
        this.taskFlowId = taskFlowId;
    }
}
