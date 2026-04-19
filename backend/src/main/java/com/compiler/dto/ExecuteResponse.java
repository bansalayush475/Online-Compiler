package com.compiler.dto;

public class ExecuteResponse {
    private String output, error, memory, cpuTime;
    private Integer statusCode;

    public ExecuteResponse() {}

    public static Builder builder() { return new Builder(); }
    public static class Builder {
        private String output, error, memory, cpuTime;
        private Integer statusCode;
        public Builder output(String v)     { this.output = v; return this; }
        public Builder error(String v)      { this.error = v; return this; }
        public Builder memory(String v)     { this.memory = v; return this; }
        public Builder cpuTime(String v)    { this.cpuTime = v; return this; }
        public Builder statusCode(Integer v){ this.statusCode = v; return this; }
        public ExecuteResponse build() {
            ExecuteResponse r = new ExecuteResponse();
            r.output = output; r.error = error; r.memory = memory;
            r.cpuTime = cpuTime; r.statusCode = statusCode;
            return r;
        }
    }

    public String getOutput()     { return output; }
    public String getError()      { return error; }
    public String getMemory()     { return memory; }
    public String getCpuTime()    { return cpuTime; }
    public Integer getStatusCode(){ return statusCode; }
    public void setOutput(String v)     { this.output = v; }
    public void setError(String v)      { this.error = v; }
    public void setMemory(String v)     { this.memory = v; }
    public void setCpuTime(String v)    { this.cpuTime = v; }
    public void setStatusCode(Integer v){ this.statusCode = v; }
}
