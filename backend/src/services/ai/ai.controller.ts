import { Controller, Get } from "@nestjs/common";
import { AIService } from "./ai.service";

@Controller("ai")
export class AIController {

  @Get("demand")
  async demand() {
    return {
      success: true,
      data: await AIService.demand()
    };
  }

  @Get("promotion")
  async promotion() {
    return {
      success: true,
      data: await AIService.promotion()
    };
  }

  @Get("recommendations")
  async recommendations() {
    return {
      success: true,
      data: await AIService.recommendations()
    };
  }

  @Get("forecast")
  async forecast() {
    return {
      success: true,
      data: await AIService.forecast()
    };
  }

  @Get("risk")
  async risk() {
    return {
      success: true,
      data: await AIService.risk()
    };
  }
}