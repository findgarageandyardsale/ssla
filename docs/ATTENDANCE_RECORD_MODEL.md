# Attendance record model (Firestore + mobile)

Attendance is stored in Firestore collection **`attendance_records`** (constant: `ATTENDANCE_RECORDS_COLLECTION`).

## Document ID (required pattern)

```
{studentId}_{date}
```

- **`studentId`** — string, must match the document ID in **`attendance_students`** (e.g. `stu-2026-0001`).
- **`date`** — string **`YYYY-MM-DD`** (local calendar day you are marking).

**Example document ID:** `stu-2026-0042_2026-03-09`

Using this ID avoids duplicates for the same student on the same day (upsert / overwrite).

## Fields (required for the web dashboard)

| Field        | Type   | Description |
|-------------|--------|-------------|
| `studentId` | string | Same as `attendance_students` doc id |
| `date`      | string | `YYYY-MM-DD` |
| `status`    | string | `"present"` or `"absent"` |

The dashboard loads records with a **date range query** on `date` and joins rows to students by `studentId`.

## Optional fields (mobile / future)

You may add extra fields for auditing; the web app **ignores** them today:

| Field          | Type      | Example use |
|----------------|-----------|-------------|
| `recordedAt`   | timestamp | When the tap happened on device |
| `source`       | string    | `"mobile"` |
| `recordedBy`   | string    | Teacher uid or email |
| `roomId`       | string    | Firestore `attendance_rooms` id at time of mark |

Keep **`studentId`**, **`date`**, and **`status`** correct so the dashboard stays accurate.

## Mobile write example (conceptual)

```text
Collection: attendance_records
Document:   stu-2026-0001_2026-03-09
Data: {
  studentId: "stu-2026-0001",
  date: "2026-03-09",
  status: "present",
  source: "mobile",
  recordedAt: <server or client timestamp>
}
```

## Security

The web dashboard and Firestore expect a **signed-in Firebase Authentication** user (see `firestore.rules`: `request.auth != null` on attendance collections).

- **Web:** sign in at `/attendance/login` with the same Email/Password user you created in Firebase Console → Authentication.
- **Mobile:** sign in with Firebase Auth on the device before reading/writing Firestore, or writes will be denied.

**Terminal scripts** (`seed:attendance-rooms`, `import:students-xlsx`) use the client SDK without a user session; if rules require auth, use the **Firebase Admin SDK** with a service account, or temporarily adjust rules for maintenance only.
