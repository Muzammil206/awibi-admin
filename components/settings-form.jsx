"use client"

import { Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useSettingsStore } from "@/lib/settings-store"

export function SettingsForm() {
  const {
    systemLanguage,
    allowNewUsers,
    defaultLanguage,
    timeZone,
    dateTimeFormat,
    courseAnalytics,
    currency,
    allowNotifications,
    backupTime,
    systemFont,
    profilePictureSizeLimit,
    passwordPolicy,
    setSetting,
  } = useSettingsStore()

  const textStyle = {
    fontFamily: 'DM Sans, sans-serif',
    fontWeight: 300,
    fontStyle: 'normal',
    fontSize: '14px',
    lineHeight: '145%',
    letterSpacing: '0%',
    verticalAlign: 'middle',
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-white border border-gray-200 shadow-sm p-6">
        <CardContent className="p-0 grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
          {/* System Language */}
          <div className="space-y-2" style={textStyle}>
            <Label htmlFor="systemLanguage" style={textStyle}>System Language</Label>
            <Select value={systemLanguage} onValueChange={(value) => setSetting("systemLanguage", value)}>
              <SelectTrigger id="systemLanguage" style={textStyle}>
                <SelectValue placeholder="Select language" style={textStyle} />
              </SelectTrigger>
              <SelectContent style={textStyle}>
                <SelectItem value="English" style={textStyle}>English</SelectItem>
                <SelectItem value="Spanish" style={textStyle}>Spanish</SelectItem>
                <SelectItem value="French" style={textStyle}>French</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* User Sign up */}
          <div className="flex items-center justify-between space-x-2" style={textStyle}>
            <Label htmlFor="allowNewUsers" style={textStyle}>Allow new users to sign up</Label>
            <Switch
              className={"#669933 "}
              id="allowNewUsers"
              checked={allowNewUsers}
              onCheckedChange={(checked) => setSetting("allowNewUsers", checked)}
            />
          </div>

          {/* Default Language */}
          <div className="space-y-2" style={textStyle}>
            <Label htmlFor="defaultLanguage" style={textStyle}>Default Language</Label>
            <Select value={defaultLanguage} onValueChange={(value) => setSetting("defaultLanguage", value)}>
              <SelectTrigger id="defaultLanguage" style={textStyle}>
                <SelectValue placeholder="Select language" style={textStyle} />
              </SelectTrigger>
              <SelectContent style={textStyle}>
                <SelectItem value="English" style={textStyle}>English</SelectItem>
                <SelectItem value="Spanish" style={textStyle}>Spanish</SelectItem>
                <SelectItem value="French" style={textStyle}>French</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Time Zone */}
          <div className="space-y-2" style={textStyle}>
            <Label htmlFor="timeZone" style={textStyle}>Time Zone</Label>
            <Select value={timeZone} onValueChange={(value) => setSetting("timeZone", value)}>
              <SelectTrigger id="timeZone" style={textStyle}>
                <SelectValue placeholder="Select time zone" style={textStyle} />
              </SelectTrigger>
              <SelectContent style={textStyle}>
                <SelectItem value="CET - Central European Time" style={textStyle}>CET - Central European Time</SelectItem>
                <SelectItem value="EST - Eastern Standard Time" style={textStyle}>EST - Eastern Standard Time</SelectItem>
                <SelectItem value="PST - Pacific Standard Time" style={textStyle}>PST - Pacific Standard Time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date and Time Format */}
          <div className="space-y-2" style={textStyle}>
            <Label htmlFor="dateTimeFormat" style={textStyle}>Date and Time Format</Label>
            <Select value={dateTimeFormat} onValueChange={(value) => setSetting("dateTimeFormat", value)}>
              <SelectTrigger id="dateTimeFormat" style={textStyle}>
                <SelectValue placeholder="Select format" style={textStyle} />
              </SelectTrigger>
              <SelectContent style={textStyle}>
                <SelectItem value="DD/MM/YYYY" style={textStyle}>DD/MM/YYYY</SelectItem>
                <SelectItem value="MM/DD/YYYY" style={textStyle}>MM/DD/YYYY</SelectItem>
                <SelectItem value="YYYY-MM-DD" style={textStyle}>YYYY-MM-DD</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Course Analytics */}
          <div className="space-y-2" style={textStyle}>
            <Label htmlFor="courseAnalytics" style={textStyle}>Course Analytics</Label>
            <Select value={courseAnalytics} onValueChange={(value) => setSetting("courseAnalytics", value)}>
              <SelectTrigger id="courseAnalytics" style={textStyle}>
                <SelectValue placeholder="Select period" style={textStyle} />
              </SelectTrigger>
              <SelectContent style={textStyle}>
                <SelectItem value="Monthly" style={textStyle}>Monthly</SelectItem>
                <SelectItem value="Weekly" style={textStyle}>Weekly</SelectItem>
                <SelectItem value="Daily" style={textStyle}>Daily</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Currency */}
          <div className="space-y-2" style={textStyle}>
            <Label htmlFor="currency" style={textStyle}>Currency</Label>
            <Select value={currency} onValueChange={(value) => setSetting("currency", value)}>
              <SelectTrigger id="currency" style={textStyle}>
                <SelectValue placeholder="Select currency" style={textStyle} />
              </SelectTrigger>
              <SelectContent style={textStyle}>
                <SelectItem value="NGN (N)" style={textStyle}>NGN (N)</SelectItem>
                <SelectItem value="USD ($)" style={textStyle}>USD ($)</SelectItem>
                <SelectItem value="EUR (€)" style={textStyle}>EUR (€)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between space-x-2" style={textStyle}>
            <Label htmlFor="allowNotifications" style={textStyle}>Allow system notifications</Label>
            <Switch
              id="allowNotifications"
              checked={allowNotifications}
              onCheckedChange={(checked) => setSetting("allowNotifications", checked)}
            />
          </div>

          {/* Scheduled Time to Backup Logs */}
          <div className="space-y-2" style={textStyle}>
            <Label htmlFor="backupTime" style={textStyle}>Scheduled Time to Backup Logs</Label>
            <div className="relative" style={textStyle}>
              <Input
                id="backupTime"
                value={backupTime}
                onChange={(e) => setSetting("backupTime", e.target.value)}
                className="pr-10"
                style={textStyle}
              />
              <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* System Font */}
          <div className="space-y-2" style={textStyle}>
            <Label htmlFor="systemFont" style={textStyle}>System Font</Label>
            <Select value={systemFont} onValueChange={(value) => setSetting("systemFont", value)}>
              <SelectTrigger id="systemFont" style={textStyle}>
                <SelectValue placeholder="Select font" style={textStyle} />
              </SelectTrigger>
              <SelectContent style={textStyle}>
                <SelectItem value="DM - Sans" style={textStyle}>DM - Sans</SelectItem>
                <SelectItem value="Inter" style={textStyle}>Inter</SelectItem>
                <SelectItem value="Roboto" style={textStyle}>Roboto</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Password Policy */}
          <div className="space-y-2" style={textStyle}>
            <Label style={textStyle}>Password Policy</Label>
            <div className="flex flex-wrap gap-2" style={textStyle}>
              {passwordPolicy.slice(0, 2).map((policy, index) => (
                <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-800 border-gray-200" style={textStyle}>
                  {policy}
                </Badge>
              ))}
              {passwordPolicy.length > 2 && (
                <Badge variant="secondary" className="bg-gray-100 text-gray-800 border-gray-200" style={textStyle}>
                  {`${passwordPolicy.length - 2} more items`}
                </Badge>
              )}
            </div>
          </div>

          {/* Size Limit for Profile Pictures */}
          <div className="space-y-2" style={textStyle}>
            <Label htmlFor="profilePictureSizeLimit" style={textStyle}>Size Limit for Profile Pictures (in Kb)</Label>
            <Select
              value={profilePictureSizeLimit}
              onValueChange={(value) => setSetting("profilePictureSizeLimit", value)}
            >
              <SelectTrigger id="profilePictureSizeLimit" style={textStyle}>
                <SelectValue placeholder="Select size limit" style={textStyle} />
              </SelectTrigger>
              <SelectContent style={textStyle}>
                <SelectItem value="Default- 4096 Kb (4Mb)" style={textStyle}>Default- 4096 Kb (4Mb)</SelectItem>
                <SelectItem value="1024 Kb (1Mb)" style={textStyle}>1024 Kb (1Mb)</SelectItem>
                <SelectItem value="2048 Kb (2Mb)" style={textStyle}>2048 Kb (2Mb)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
