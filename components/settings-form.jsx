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

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-white border border-gray-200 shadow-sm p-6">
        <CardContent className="p-0 grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
          {/* System Language */}
          <div className="space-y-2">
            <Label htmlFor="systemLanguage">System Language</Label>
            <Select value={systemLanguage} onValueChange={(value) => setSetting("systemLanguage", value)}>
              <SelectTrigger id="systemLanguage">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Spanish">Spanish</SelectItem>
                <SelectItem value="French">French</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* User Sign up */}
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="allowNewUsers">Allow new users to sign up</Label>
            <Switch
              className={"#669933 "}
              id="allowNewUsers"
              checked={allowNewUsers}
              onCheckedChange={(checked) => setSetting("allowNewUsers", checked)}
            />
          </div>

          {/* Default Language */}
          <div className="space-y-2">
            <Label htmlFor="defaultLanguage">Default Language</Label>
            <Select value={defaultLanguage} onValueChange={(value) => setSetting("defaultLanguage", value)}>
              <SelectTrigger id="defaultLanguage">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Spanish">Spanish</SelectItem>
                <SelectItem value="French">French</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Time Zone */}
          <div className="space-y-2">
            <Label htmlFor="timeZone">Time Zone</Label>
            <Select value={timeZone} onValueChange={(value) => setSetting("timeZone", value)}>
              <SelectTrigger id="timeZone">
                <SelectValue placeholder="Select time zone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CET - Central European Time">CET - Central European Time</SelectItem>
                <SelectItem value="EST - Eastern Standard Time">EST - Eastern Standard Time</SelectItem>
                <SelectItem value="PST - Pacific Standard Time">PST - Pacific Standard Time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date and Time Format */}
          <div className="space-y-2">
            <Label htmlFor="dateTimeFormat">Date and Time Format</Label>
            <Select value={dateTimeFormat} onValueChange={(value) => setSetting("dateTimeFormat", value)}>
              <SelectTrigger id="dateTimeFormat">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Course Analytics */}
          <div className="space-y-2">
            <Label htmlFor="courseAnalytics">Course Analytics</Label>
            <Select value={courseAnalytics} onValueChange={(value) => setSetting("courseAnalytics", value)}>
              <SelectTrigger id="courseAnalytics">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Monthly">Monthly</SelectItem>
                <SelectItem value="Weekly">Weekly</SelectItem>
                <SelectItem value="Daily">Daily</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Currency */}
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select value={currency} onValueChange={(value) => setSetting("currency", value)}>
              <SelectTrigger id="currency">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NGN (N)">NGN (N)</SelectItem>
                <SelectItem value="USD ($)">USD ($)</SelectItem>
                <SelectItem value="EUR (€)">EUR (€)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="allowNotifications">Allow system notifications</Label>
            <Switch
              id="allowNotifications"
              checked={allowNotifications}
              onCheckedChange={(checked) => setSetting("allowNotifications", checked)}
            />
          </div>

          {/* Scheduled Time to Backup Logs */}
          <div className="space-y-2">
            <Label htmlFor="backupTime">Scheduled Time to Backup Logs</Label>
            <div className="relative">
              <Input
                id="backupTime"
                value={backupTime}
                onChange={(e) => setSetting("backupTime", e.target.value)}
                className="pr-10"
              />
              <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* System Font */}
          <div className="space-y-2">
            <Label htmlFor="systemFont">System Font</Label>
            <Select value={systemFont} onValueChange={(value) => setSetting("systemFont", value)}>
              <SelectTrigger id="systemFont">
                <SelectValue placeholder="Select font" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DM - Sans">DM - Sans</SelectItem>
                <SelectItem value="Inter">Inter</SelectItem>
                <SelectItem value="Roboto">Roboto</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Password Policy */}
          <div className="space-y-2">
            <Label>Password Policy</Label>
            <div className="flex flex-wrap gap-2">
              {passwordPolicy.slice(0, 2).map((policy, index) => (
                <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-800 border-gray-200">
                  {policy}
                </Badge>
              ))}
              {passwordPolicy.length > 2 && (
                <Badge variant="secondary" className="bg-gray-100 text-gray-800 border-gray-200">
                  {`${passwordPolicy.length - 2} more items`}
                </Badge>
              )}
            </div>
          </div>

          {/* Size Limit for Profile Pictures */}
          <div className="space-y-2">
            <Label htmlFor="profilePictureSizeLimit">Size Limit for Profile Pictures (in Kb)</Label>
            <Select
              value={profilePictureSizeLimit}
              onValueChange={(value) => setSetting("profilePictureSizeLimit", value)}
            >
              <SelectTrigger id="profilePictureSizeLimit">
                <SelectValue placeholder="Select size limit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Default- 4096 Kb (4Mb)">Default- 4096 Kb (4Mb)</SelectItem>
                <SelectItem value="1024 Kb (1Mb)">1024 Kb (1Mb)</SelectItem>
                <SelectItem value="2048 Kb (2Mb)">2048 Kb (2Mb)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
